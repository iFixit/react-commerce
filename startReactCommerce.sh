#!/bin/bash

echo "Starting react-commerce localdev"

git checkout main
git pull
git checkout -
rm -rf node_modules
npm install -g pnpm@8
npm install -g yarn
cp .env.local.example .env.local

## Verdaccio setup
read -p "Do you have a verdaccio account? (y/n)? [y]: " userInput

# Remove leading/trailing whitespace and convert to lowercase
userInput=$(echo "${userInput}" | tr '[:upper:]' '[:lower:]' | xargs)

# Check the user's input
while [[ ! "${userInput}" =~ ^(y|n)$ ]]; do
    if [[ -z "${userInput}" ]]; then
        userInput="y"  # Set default value to "yes" if no input is provided
        break
    fi
    echo "Invalid input. Please enter 'y' or 'n'."
    read -p "Do you have a verdaccio account? (y/n)? [y]: " userInput
    userInput=$(echo "${userInput}" | tr '[:upper:]' '[:lower:]' | xargs)
done

while true; do
    if [[ "${userInput}" == "y" ]]; then
        echo "Please log in to your Verdaccio account."
        pnpm login --registry=https://verdaccio.ubreakit.com
    else
        echo "No Verdaccio account detected. Creating a new account for you..."
        pnpm adduser --registry=https://verdaccio.ubreakit.com
    fi

    # Check for login or adduser success
    if [ $? -eq 0 ]; then
        echo "Successfully logged in to Verdaccio."
        break
    else
        echo "Error with Verdaccio account credentials. Please check your input and try again."
        read -p "Do you want to retry? (y/n): " retryInput
        retryInput=$(echo "${retryInput}" | tr '[:upper:]' '[:lower:]' | xargs)

        if [[ "${retryInput}" != "y" ]]; then
            echo "Exiting script."
            exit 1
        fi
    fi
done

npmrcPath=~/.npmrc
envFilePath=.env.local

# Extract token from ~/.npmrc
token=$(cat ~/.npmrc |  grep -o '\/\/verdaccio\.ubreakit\.com\/:_authToken="[^"]*"' | sed 's/\/\/verdaccio\.ubreakit\.com\/:_authToken="//' | sed 's/"$//')

if [ -z "$token" ]; then
    echo "Token not found in ~/.npmrc"
    return 1
else
    export VERDACCIO_AUTH_TOKEN=$token
fi

# Update .env.local with VERDACCIO_AUTH_TOKEN
awk -v token="\"$token\"" '/^VERDACCIO_AUTH_TOKEN=/{$0="VERDACCIO_AUTH_TOKEN=" token}1' .env.local > .env.local.tmp && mv .env.local.tmp .env.local

echo -e "Token successfully copied to .env.local\n\n"

cp backend/.env.example backend/.env

envFilePath="frontend/.env.local"
exampleEnvFilePath="frontend/.env.local.example"

# Check if .env.local file exists
if [ ! -f "$envFilePath" ]; then
    echo "$envFilePath does not exist. Creating a new file..."
    cp "$exampleEnvFilePath" "$envFilePath"
fi

# Check if the algoliaApiKey environment variable is set
if [ -z "$algoliaApiKey" ]; then
    echo "You must set the algoliaApiKey variable in your environment."
    echo -e 'Try running with: \n\nexport algoliaApiKey=YOUR_API_KEY \nnvm use && ./startReactCommerce.sh\n'
    echo -e 'Or you can run it in one line with: \n\nnvm use && algoliaApiKey=xyz123 ./startReactCommerce.sh'
    exit 1
else
    # Update ALGOLIA_API_KEY in .env.local file
    awk -v placeholder="\"$algoliaApiKey\"" '/^ALGOLIA_API_KEY=/{gsub(/=.*/, "=" placeholder)} 1' "$envFilePath" > "$envFilePath.tmp" && mv "$envFilePath.tmp" "$envFilePath"
    echo "ALGOLIA_API_KEY updated in $envFilePath"
fi

pnpm install:all

## We can remove the verdaccio token after exporting it to .env.local
pnpm logout --registry=https://verdaccio.ubreakit.com

pnpm dev
