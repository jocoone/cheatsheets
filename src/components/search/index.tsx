import { Cheatsheet, CheatsheetResult } from 'src/domain/cheatsheet';
import { Menu, MenuItem, Typeahead, UseAsyncProps, withAsync } from 'react-bootstrap-typeahead';
import { Option } from 'react-bootstrap-typeahead/types/types';
import { ComponentType, useReducer } from 'react';
import { Author, AuthorResult } from 'src/domain/author';
import { TYPE } from 'src/domain/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-regular-svg-icons';

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
  type: 'person' | 'article';
};

const CustomMenuItem = ({ option, position, search, type }: MenuItemProps) => {
  const regex = new RegExp(search, 'i');
  const field = option.value;
  const executed = regex.exec(field) || [];
  const titleParts = field.split(regex).join(`<b>${executed[0]}</b>`);

  return (
    <MenuItem option={option} position={position}>
      <FontAwesomeIcon icon={type === 'article' ? faFile : faPerson} className="menu-item-icon" />
      <div className="item-info">
        <span className="title" dangerouslySetInnerHTML={{ __html: titleParts }}></span>
        {option.type === TYPE.CHEATSHEET && (option as CheatsheetResult).author && (
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

          return (
            <Menu {...menuProps}>
              {people.length ? <span className="category-title">People</span> : null}
              {people.map((result, index) => (
                <CustomMenuItem
                  option={result}
                  position={index}
                  search={text}
                  key={result.id}
                  type="person"
                />
              ))}
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
