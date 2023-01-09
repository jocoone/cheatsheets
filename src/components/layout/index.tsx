type Props = {
  className?: string;
  full?: boolean;
  children: JSX.Element | Array<JSX.Element>;
};

export default function Layout({ className = '', children, full = false }: Props) {
  return (
    <div className={`page ${full && 'full'}`}>
      <div className="page-container">
        <div className={className}>{children}</div>
      </div>
    </div>
  );
}
