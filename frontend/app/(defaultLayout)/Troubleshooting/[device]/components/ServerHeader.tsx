export type ServerHeaderProps = {
   device: string;
};

export default function ServerHeader({ device }: ServerHeaderProps) {
   return <span>Device: {device}</span>;
}
