import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/jobs", data);
    toast.success("Job Added successfully");
    return redirect("all-jobs");
  } catch (error) {
    toast.error("Failed to add job.");
    return error;
  }
};

const AddJob = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>add job</h4>
        <div className='form-center'>
          <FormRow type='text' name='position' />
          <FormRow type='text' name='company' />
          <FormRow
            type='text'
            labelText='job location'
            name='jobLocation'
            defaultValue={user.location}
          />
          <div className='form-row'>
            <label htmlFor='jobType' className='form-label'>
              job type
            </label>
            <select
              name='jobType'
              id='jobType'
              className='form-select'
              defaultValue={JOB_TYPE.FULL_TIME}
            >
              {Object.values(JOB_TYPE).map((itemValue) => {
                return (
                  <option key={itemValue} value={itemValue}>
                    {itemValue}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='form-row'>
            <label htmlFor='jobStatus' className='form-label'>
              job status
            </label>
            <select
              name='jobStatus'
              id='jobStatus'
              className='form-select'
              defaultValue={JOB_STATUS.PENDING}
            >
              {Object.values(JOB_STATUS).map((itemValue) => {
                return (
                  <option key={itemValue} value={itemValue}>
                    {itemValue}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            type='submit'
            className='btn btn-block form-btn'
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting" : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddJob;
