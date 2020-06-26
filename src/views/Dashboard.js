/*!

=========================================================
* Now UI Dashboard React - v1.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  CardLink,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader";
import dummyOrganizations from "data/organizations";
import parseQueryString from "utils/utils";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      organizations: [],
      search: null,
    };
  }

  fetch() {
    // FETCH FROM API
    // @TODO: Fix infinite loop of componentDidMount to this api. Could be <Redirect /> issue
    //   this.setState({ ...this.state, isFetching: true });
    //
    //   fetch(`https://api.github.com/organizations`)
    //     .then((response) => response.json())
    //     .then((organizations) => {
    //       if (!organizations.message) {
    //         this.setState({
    //           organizations: organizations,
    //         });
    //       } else {
    //         this.setState({ organizations: dummyOrganizations });
    //       }
    //     })
    //     .catch((error) =>
    //       this.setState({ message: error.message, isFetching: false })
    //     );

    //   this.setState({ ...this.state, isFetching: false });

    // FETCH DUMMY DATA
    this.setState({ organizations: dummyOrganizations });
    this.setState({ ...this.state, isFetching: false });
  }

  getQueryString() {
    if (this.props.location.search) {
      const search = parseQueryString(this.props.location.search);
      this.setState({ search: search });
    }
  }

  componentDidMount() {
    const { isFetching } = this.state;

    this.getQueryString();

    if (!isFetching) {
      this.fetch();
      this.timer = setInterval(() => this.fetch(), 5000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  render() {
    const { organizations, search } = this.state;

    // @TODO: Consider adding in the DemoNavbar with the Search in order to trigger the filter onSubmit
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            {organizations
              .filter((org) => {
                if (search == null) {
                  return org;
                } else if (
                  search &&
                  org.login.toLowerCase().includes(search.toLowerCase())
                ) {
                  return org;
                }
                return null;
              })
              .map((org) => {
                return (
                  <Col xs={12} md={3}>
                    <Card className="card-chart">
                      <CardHeader>
                        <img
                          className={"now-ui-icons"}
                          src={org.avatar_url}
                          width="50"
                          height="50"
                          alt="org avatar"
                        ></img>
                        <CardTitle tag="h4">
                          <CardLink
                            href={`/admin/repositories?org=${org.login}`}
                          >
                            {org.login}
                          </CardLink>
                        </CardTitle>
                      </CardHeader>
                      <CardFooter>
                        <div className="stats">
                          <i className="now-ui-icons arrows-1_refresh-69" />{" "}
                          Just Updated
                        </div>
                      </CardFooter>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
