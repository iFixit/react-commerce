type ConditionalWrapperProps = React.PropsWithChildren<{
   condition: boolean;
   wrapper: (children: React.ReactNode) => React.ReactNode;
}>;

export function ConditionalWrapper({
   condition,
   wrapper,
   children,
}: ConditionalWrapperProps) {
   return condition ? <>{wrapper(children)}</> : <>{children}</>;
}
