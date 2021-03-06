import React, { useState, useContext } from "react";
import styled from "styled-components";
import { MdSearch } from "react-icons/md";
import { GithubContext } from "../context/context";

const Wrapper = styled.div`
  position: relative;
  display: grid;
  gap: 1rem 1.75rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr max-content;
    align-items: center;
    h3 {
      padding: 0 0.5rem;
    }
  }
  .form-control {
    background: var(--clr-white);
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    column-gap: 0.5rem;
    border-radius: 5px;
    padding: 0.5rem;
    input {
      border-color: transparent;
      outline-color: var(--clr-grey-10);
      letter-spacing: var(--spacing);
      color: var(--clr-grey-3);
      padding: 0.25rem 0.5rem;
    }
    input::placeholder {
      color: var(--clr-grey-3);
      text-transform: capitalize;
      letter-spacing: var(--spacing);
    }
    button {
      border-radius: 5px;
      border-color: transparent;
      padding: 0.25rem 0.5rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      background: var(--clr-primary-5);
      color: var(--clr-white);
      transition: var(--transition);
      cursor: pointer;
      &:hover {
        background: var(--clr-primary-8);
        color: var(--clr-primary-1);
      }
    }

    svg {
      color: var(--clr-grey-5);
    }
    input,
    button,
    svg {
      font-size: 1.3rem;
    }
    @media (max-width: 800px) {
      button,
      input,
      svg {
        font-size: 0.85rem;
      }
    }
  }
  h3 {
    margin-bottom: 0;
    color: var(--clr-grey-5);
    font-weight: 400;
  }
`;
const ErrorWrapper = styled.article`
  text-transform: capitalize;
  text-align: center;
  margin-top: 0.5rem;
  p {
    color: red;
    letter-spacing: var(--spacing);
  }
`;

const Search = () => {
  const [user, setUser] = useState("");
  const { requests, error, searchGithubUser } = useContext(GithubContext)
  const handleSubmit = async (e) => {
    e.preventDefault();
    searchGithubUser(user)
  };

  console.log("error from search component", error)

  return (
    <section className="section">
      <Wrapper className="section-center">
        <form onSubmit={e => handleSubmit(e)}>
          <div className="form-control">
            <MdSearch />
            <input
              type="text"
              placeholder="enter github user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
            {requests > 0 && <button type="submit">Search</button>}
          </div>
        </form>
        <h3>requests: {requests} / 60</h3>
      </Wrapper>
      {error.show && (
        <ErrorWrapper>
          <p>{error.msg}</p>
        </ErrorWrapper>
      )}
    </section>
  );
};

export default Search;
