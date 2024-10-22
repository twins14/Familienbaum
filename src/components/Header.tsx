import React from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

interface HeaderProps {
  surname: string;
}

const Header: React.FC<HeaderProps> = ({ surname }) => {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{surname} Family Tree</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="flex items-center hover:text-blue-200">
                <LucideIcons.Tree className="mr-1" size={20} />
                Tree
              </Link>
            </li>
            <li>
              <Link to="/export" className="flex items-center hover:text-blue-200">
                <LucideIcons.Download className="mr-1" size={20} />
                Export
              </Link>
            </li>
            <li>
              <Link to="/users" className="flex items-center hover:text-blue-200">
                <LucideIcons.Users className="mr-1" size={20} />
                Users
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;