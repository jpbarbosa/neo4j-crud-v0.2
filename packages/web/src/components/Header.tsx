import { Link, PathPattern, useMatch } from 'react-router-dom';

type NavItem = {
  path: string;
  label: string;
};

type PageButtonProps = {
  item: NavItem;
};

const PageButton: React.FC<PageButtonProps> = ({ item: { path, label } }) => {
  const pathPattern: PathPattern<string> = { path: `${[path]}/*` };
  const match = useMatch(pathPattern);
  const isActive = !!match;
  const classList = ['button', isActive ? 'active' : ''];

  return (
    <Link to={path} className={classList.join(' ')}>
      {label}
    </Link>
  );
};

export const Header: React.FC = () => {
  const navItems: NavItem[] = [
    { path: '/movies', label: 'Movies' },
    { path: '/people', label: 'People' },
    { path: '/visualization', label: 'Graph Visualization' },
  ];

  return (
    <header>
      <h1>
        <div className="title">Neo4j Fullstack CRUD</div>
        <div className="subtitle">
          With NX Monorepo, Express, React and TypeScript
        </div>
      </h1>
      <div className="navigation">
        <div className="internal">
          {navItems.map((item) => (
            <PageButton item={item} key={item.path} />
          ))}
        </div>
        <div className="external">
          <a
            href="https://github.com/jpbarbosa/neo4j-crud"
            target="_blank"
            rel="noreferrer"
            className="button"
          >
            GitHub / jpbarbosa
          </a>
        </div>
      </div>
    </header>
  );
};
