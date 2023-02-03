import { Cheatsheet, CheatsheetResult } from 'src/domain/cheatsheet';
import { Menu, MenuItem, Typeahead, UseAsyncProps, withAsync } from 'react-bootstrap-typeahead';
import { Option } from 'react-bootstrap-typeahead/types/types';
import { ComponentType, useEffect, useReducer, useState } from 'react';
import { Author, AuthorResult } from 'src/domain/author';
import { TYPE } from 'src/domain/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-regular-svg-icons';
import { faHashtag } from '@fortawesome/free-solid-svg-icons/faHashtag';

const AsyncTypeahead = withAsync(Typeahead as ComponentType<UseAsyncProps>);

type Props = {
  className?: string;
  select: (options: Option[]) => void;
  placeholder?: string;
  onMenuToggle?: (isOpen: boolean) => void;
};

type State = {
  loading: boolean;
  items: (Cheatsheet | Author)[];
};

const initialState: State = {
  loading: false,
  items: []
};

enum ACTION {
  LOADING = 'LOADING',
  SET_ITEMS = 'SET_ITEMS'
}

type StateAction = {
  type: ACTION;
  value: boolean | Cheatsheet[];
};

function searchReducer(state: State, action: StateAction): State {
  const { type, value } = action;
  switch (type) {
    case ACTION.LOADING:
      return {
        loading: value as boolean,
        items: state.items
      };
    case ACTION.SET_ITEMS:
      return {
        loading: false,
        items: value as Cheatsheet[]
      };
    default:
      return state;
  }
}

type MenuItemProps = {
  option: CheatsheetResult | AuthorResult;
  position: number;
  search: string;
  type: 'person' | 'article' | 'other';
};

const ICON_MAPPER = {
  person: faPerson,
  article: faFile,
  other: faHashtag
};

const CustomMenuItem = ({ option, position, search, type }: MenuItemProps) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    const regex = new RegExp(search, 'i');
    const field = option.value;
    const executed = regex.exec(field) || [];
    setTitle(field.split(regex).join(`<b>${executed[0]}</b>`));
  }, [option.id]);

  return (
    <MenuItem option={option} position={position}>
      <FontAwesomeIcon icon={ICON_MAPPER[type] || faHashtag} className="menu-item-icon" />
      <div className="item-info">
        <span className="title" dangerouslySetInnerHTML={{ __html: title }}></span>
        {(option as CheatsheetResult).author && (
          <span className="author">{(option as CheatsheetResult).author}</span>
        )}
      </div>
    </MenuItem>
  );
};

const Search = ({
  className = 'search',
  select,
  placeholder = 'How to write a cheatsheet?',
  onMenuToggle = (isOpen: boolean) => isOpen
}: Props) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  function search(query: string) {
    dispatch({ type: ACTION.LOADING, value: true });
    fetch(`/api/cheatsheets?q=${query}`)
      .then((resp) => resp.json())
      .then((items) => dispatch({ type: ACTION.SET_ITEMS, value: items }));
  }

  return (
    <div className="search-wrapper">
      <AsyncTypeahead
        className={className}
        isLoading={state.loading}
        id="cheatsheetsearch"
        onSearch={search}
        onChange={select}
        multiple={false}
        maxResults={10}
        placeholder={placeholder}
        options={state?.items}
        autoFocus={true}
        labelKey="value"
        minLength={3}
        onMenuToggle={onMenuToggle}
        renderMenu={(results: any[], menuProps: any, { text }: any) => {
          const people = results.filter((result) => result.type === TYPE.PEOPLE);
          const cheatSheets = results.filter((result) => result.type === TYPE.CHEATSHEET);
          const other = results.filter((result) => result.type === TYPE.OTHER);

          return (
            <Menu {...menuProps}>
              {cheatSheets.length ? <span className="category-title">Cheatsheets</span> : null}
              {cheatSheets.map((result, index) => (
                <CustomMenuItem
                  option={result}
                  position={index}
                  search={text}
                  key={result.id}
                  type="article"
                />
              ))}
              {people.length ? <span className="category-title">People</span> : null}
              {people.map((result, index) => (
                <CustomMenuItem
                  option={result}
                  position={index + cheatSheets.length}
                  search={text}
                  key={result.id}
                  type="person"
                />
              ))}
              {other.length ? <span className="category-title">Other</span> : null}
              {other.map((result, index) => (
                <CustomMenuItem
                  option={result}
                  position={index + cheatSheets.length + people.length}
                  search={text}
                  key={result.id}
                  type="other"
                />
              ))}
              {!results.length && <div className="no-pages">No pages found</div>}
            </Menu>
          );
        }}
      />
      <FontAwesomeIcon icon={faSearch} className="icon" />
    </div>
  );
};

export default Search;
