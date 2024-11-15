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
  CardBody,
  CardHeader,
  CardLink,
  CardSubtitle,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader";
import dummyRepos from "data/repositories";
import parseQueryString from "utils/utils";

class RegularTables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      repositories: [],
      search: null,
    };
  }

  fetch() {
    // FETCH FROM API
    // const { search } = this.state;
    // const org = search ? search["org"] : null;

    // if (org) {
    //   this.setState({ ...this.state, isFetching: true });

    //   fetch(`https://api.github.com/orgs/${org}/repos`)
    //     .then((response) => response.json())
    //     .then((repos) => {
    //       if (!repos.message) {
    //         this.setState({
    //           repos: repos,
    //         });
    //       } else {
    //         //@TODO: Handle 403 Rate Limit Error. Likely show user notification with some call to action. Using authenticated user would help.
    //         this.setState({ repositories: dummyRepos });
    //       }
    //     })
    //     .catch((error) =>
    //       this.setState({ message: error.message, isFetching: false })
    //     );

    //   this.setState({ ...this.state, isFetching: false });
    // }

    // FETCH DUMMY DATA
    this.setState({ repositories: dummyRepos });
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
    const { repositories } = this.state;

    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col xs={12}>
              <Card className="card-chart">
                <CardHeader>
                  <Nav tabs>
                    <NavItem>
                      <NavLink href="/admin/repositories" active>
                        Repositories
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody>
                  <ListGroup flush>
                    {repositories
                      .sort((a, b) =>
                        a.stargazers_count > b.stargazers_count ? -1 : 1
                      )
                      .map((repo, key) => (
                        <ListGroupItem key={key}>
                          <CardTitle tag="h4">
                            <CardLink
                              href={`/admin/commits?repo_full_name=${repo.full_name}`}
                            >
                              {repo.full_name}
                            </CardLink>
                          </CardTitle>
                          <CardSubtitle>
                            <div className="stats">
                              <i className="fa fa-star" />
                              <span className="subtitle-text">
                                {repo.stargazers_count}
                              </span>
                            </div>
                          </CardSubtitle>
                        </ListGroupItem>
                      ))}
                  </ListGroup>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default RegularTables;
