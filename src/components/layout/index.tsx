type Props = {
  className?: string;
  children: JSX.Element | Array<JSX.Element>;
};

export default function Layout({ className = "", children }: Props) {
  return (
    <div className="page">
      <div className="page-container">
        <div className={className}>{children}</div>
      </div>
    </div>
  );
}
