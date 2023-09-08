export type ServerHeaderProps = {
   device: string;
};

export default function ServerHeader({ device }: ServerHeaderProps) {
   return <h2 className="text-4xl font-bold">Device: {device}</h2>;
}
