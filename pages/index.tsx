import Layout from "src/components/layout";
import { Cheatsheet } from "src/domain/cheatsheet";
import { ComponentType, useReducer, useEffect, useState } from "react";
import { Typeahead, UseAsyncProps, withAsync } from "react-bootstrap-typeahead";
import { Option } from "react-bootstrap-typeahead/types/types";

import styles from "../styles/Home.module.scss";
import Logo from "src/components/logo";
import Head from "next/head";

const AsyncTypeahead = withAsync(Typeahead as ComponentType<UseAsyncProps>);

type State = {
  loading: boolean;
  items: Cheatsheet[];
};

enum ACTION {
  LOADING = "LOADING",
  SET_ITEMS = "SET_ITEMS"
}

type StateAction = {
  type: ACTION;
  value: boolean | Cheatsheet[];
};

const initialState: State = {
  loading: false,
  items: []
};

function homeReducer(state: State, action: StateAction): State {
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

export default function Home() {
  const [state, dispatch] = useReducer(homeReducer, initialState);
  const [showTypeahead, setShowTypeahead] = useState(false);

  function search(query: string) {
    dispatch({ type: ACTION.LOADING, value: true });
    fetch(`/api/cheatsheets?q=${query}`)
      .then((resp) => resp.json())
      .then((items) => dispatch({ type: ACTION.SET_ITEMS, value: items }));
  }

  function selectCheatsheet([option]: Option[]) {
    if (option) {
      const cheatsheet = option as Cheatsheet;
      location.href = cheatsheet.url;
    }
  }

  useEffect(() => {
    setShowTypeahead(true);
  });

  if (!showTypeahead) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Cheatsheets</title>
      </Head>
      <Layout>
        <div className={styles.content}>
          <div className={styles.header}>
            <Logo className={styles.logo} />
          </div>
          <AsyncTypeahead
            className={styles.search}
            isLoading={state.loading}
            id="cheatsheetsearch"
            onSearch={search}
            onChange={selectCheatsheet}
            multiple={false}
            maxResults={10}
            placeholder="How to write a cheatsheet?"
            options={state?.items}
            labelKey="title"
            renderMenuItemChildren={(option: any, props: any) => {
              const regex = new RegExp(props.text, "i");
              const executed = regex.exec(option.title) || [];
              const titleParts = option.title.split(regex).join(`<b>${executed[0]}</b>`);
              return <div className="menu-item">
                <span className="title" dangerouslySetInnerHTML={{ __html: titleParts }}></span>
                {option.tags &&
                  <div className="tags">{option.tags.map((tag: string, index: number) => (
                    <span className="tag" key={index}>{tag}</span>
                  ))}</div>}
              </div>;
            }}
          />
        </div>
      </Layout>
    </>

  );
}
