import { Button, Container, Typography } from "@mui/material"
import { Formik } from "formik"
import { ApiError, Auth, UserData } from "../../../api"
import Input from "../../Commons/Input"
import { useSnackbar } from "notistack"

const Login = ({ setUser }: { setUser: (arg0: UserData) => void }) => {
  const { enqueueSnackbar } = useSnackbar()

  return (
    <Container>
      <Typography variant={"h3"}>Please log in</Typography>
      <Formik
        initialValues={{ name: "", password: "" }}
        onSubmit={async (values) => {
          try {
            const user = await Auth.login({
              name: values.name,
              password: values.password,
            })
            setUser(user)
          } catch (error) {
            if (typeof error === "string") {
              enqueueSnackbar(error, { variant: "error" })
            } else if (error instanceof ApiError) {
              enqueueSnackbar(error.body?.detail ?? error.body.error, {
                variant: "error",
              })
            } else if (error instanceof Error) {
              enqueueSnackbar(error.message, { variant: "error" })
            }
          }
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Input
              label={"Name"}
              type={"text"}
              name={"name"}
              value={props.values.name}
              onBlur={props.handleBlur}
              onChange={props.handleChange}
            />
            <Input
              label={"Password"}
              type={"password"}
              name={"password"}
              value={props.values.password}
              onBlur={props.handleBlur}
              onChange={props.handleChange}
            />
            <Button type={"submit"} value={"Submit"}>
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Container>
  )
}

export default Login
