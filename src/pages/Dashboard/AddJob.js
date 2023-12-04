import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../../components";
import { toast } from "react-toastify";
import {
  handleChange,
  clearValues,
  createJob,
  editJob,
} from "../../features/job/jobSlice";
import { useEffect } from "react";
const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      toast.error("Please provide all value");
      return;
    }
    if (isEditing) {
      return dispatch(
        editJob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType, status },
        })
      );
    }
    return dispatch(
      createJob({ position, company, jobLocation, jobType, status })
    );
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };
  // we add this for when in profile we add our location, when we want to add a job it automatically add our current location to the job. This is optional
  useEffect(() => {
    if (!isEditing) {
      dispatch(
        handleChange({
          name: "jobLocation",
          value: user.location,
        })
      );
    }
  }, [dispatch, isEditing, user.location]);

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{isEditing ? "edit Job" : "add Job"}</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="job Location"
            value={jobLocation}
            handleChange={handleJobInput}
          />

          <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          <FormRowSelect
            name="jobType"
            labelText="job Type"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />

          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              disabled={isLoading}
            >
              {isLoading
                ? "Please Wait..."
                : isEditing
                ? "save changes"
                : "submit"}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
