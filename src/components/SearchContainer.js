import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../components";
import {
  clearFilters,
  handleChange,
} from "../features/allJobSlice/allJobSlice";
const SearchContainer = () => {
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);
  const handleSearchInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch(handleChange({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            labelText="search job"
            value={search}
            handleChange={handleSearchInput}
          />

          <FormRowSelect
            name="searchStatus"
            labelText="status"
            value={searchStatus}
            handleChange={handleSearchInput}
            list={["all", ...statusOptions]}
          />
          <FormRowSelect
            name="searchType"
            labelText="search"
            value={searchType}
            handleChange={handleSearchInput}
            list={["all", ...jobTypeOptions]}
          />
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearchInput}
            list={sortOptions}
          />

          <button
            disabled={isLoading}
            className="btn btn-block clear-btn"
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default SearchContainer;
