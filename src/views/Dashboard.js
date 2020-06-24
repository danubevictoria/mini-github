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
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import dummyOrganizations from "data/organizations.js";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      organizations: [],
    };
  }

  fetchOrgs() {
    this.setState({ ...this.state, isFetching: true });

    fetch(`https://api.github.com/organizations`)
      .then((response) => response.json())
      .then((organizations) => {
        // if (!organizations.message) {
        //   this.setState({
        //     organizations: organizations,
        //   });
        // } else {
        this.setState({ organizations: dummyOrganizations });
        // }
      })
      .catch((error) =>
        this.setState({ message: error.message, isFetching: false })
      );

    this.setState({ ...this.state, isFetching: false });
  }

  componentDidMount() {
    this.fetchOrgs();
    this.timer = setInterval(() => this.fetchOrgs(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  render() {
    var { organizations } = this.state;

    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            {organizations.map((org) => (
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
                      <CardLink href={"/extended-tables"}>{org.login}</CardLink>
                    </CardTitle>
                  </CardHeader>
                  <CardFooter>
                    <div className="stats">
                      <i className="now-ui-icons arrows-1_refresh-69" /> Just
                      Updated
                    </div>
                  </CardFooter>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
