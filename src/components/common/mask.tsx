interface Props{
    children:any;
    onClick?:React.MouseEventHandler<HTMLSpanElement> | undefined
}
export const Mask = (props: Props) => {
  const { children, onClick } = props;
  return (
    <div
      className="mask"
      onClick={onClick}
    >
      {children}
    </div>
  );
};
