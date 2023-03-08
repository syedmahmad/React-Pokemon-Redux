import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchData } from '../actions'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPaginate from "react-paginate";
import axios from 'axios';

const Home = () => {
  
  const [currentPage, setCurrentPage] = useState();
  const [offset, setOffset] = useState(0);
  const [active,setActiveOffset] = useState();
  const dispatch = useDispatch();
  const data = useSelector(state => state.data);
  const navigate = useNavigate();
  const location = useLocation();

  const totalRecords = data?.count;
  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalRecords / itemsPerPage);
  const currentlocation = location.pathname;
  const exactPath = currentlocation.split('/')[1];

  useEffect(() => {
    if(offset === 0)
    {
      const stayingOffset = (exactPath - 1) * 20
      dispatch(fetchData(stayingOffset))
    }else {
      dispatch(fetchData(offset));
    }
  }, [offset]);

  const handlePageClick = (data) => {

    const selectedPage = (data.selected + 1);
    const newOffset = (selectedPage - 1) * itemsPerPage;
    setOffset(newOffset);
    navigate(`/${selectedPage}`);

  }
  const handleNextPageClick = () => {

    axios.get(data?.next)
      .then(response => {
        dispatch({
          type: 'FETCHDATA_SUCCESS',
          payload: response.data
        });
      });

  }
  const handlePreviousPageClick = () => {

    axios.get(data?.previous)
      .then(response => {
        dispatch({
          type: 'FETCHDATA_SUCCESS',
          payload: response.data
        });
      })

  };

  return (
    <>
      <div>
        {data?.results ? data?.results.map((pokemon) => {
          const url = pokemon.url.slice(0, pokemon.url.length - 1);
          const lastNumber = url.split("/").pop();
          return (
            <div key={pokemon?.name}>
              {pokemon?.name}
              <br />
              <Link to={`/${(pokemon?.name)}/${lastNumber}`}>
                Go to: {pokemon?.url}
              </Link>
            </div>
          )
        }) : <p>Empty</p>}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel={exactPath < `${totalPages}` ? "< next" : null}
        onPageChange={handlePageClick}
        onClick={(clickEvent) => {
          // console.log("ClickEvent", clickEvent)//for checking isnext True 
          if (clickEvent.isNext) {
            handleNextPageClick()
          }
          if (clickEvent.isPrevious) {
            handlePreviousPageClick()
          }
        }}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        forcePage={exactPath - 1}
        previousLabel={exactPath > 1 ? "< previous" : null}
        renderOnZeroPageCount={null}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </>
  );
};
export default Home;