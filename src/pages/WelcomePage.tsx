import { Link } from "react-router-dom"
import { PageWrapper } from "./PageWrapper"
import "./WelcomePage.css"

export const WelcomePage = () => {
  return (
    <PageWrapper type="third">
      <Link className="lets-go delayed-fade-in" to="/projects">
        Lets Go
      </Link>
    </PageWrapper>
  )
}
