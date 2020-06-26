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
import dummyCommits from "data/commits";
import parseQueryString from "utils/utils";

class RegularTables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      commits: [],
      search: null,
    };
  }

  fetch() {
    // FETCH FROM API
    // const { search } = this.state;
    // const repoFullName = search ? search["repo_full_name"] : null;
    //
    // this.setState({ ...this.state, isFetching: true });
    //
    // fetch(`https://api.github.com/repos/${repoFullName}/commits`)
    //   .then((response) => response.json())
    //   .then((commits) => {
    //     if (!commits.message) {
    //       this.setState({
    //         commits: commits,
    //       });
    //     } else {
    //       this.setState({ commits: dummyCommits });
    //     }
    //   })
    //   .catch((error) =>
    //     this.setState({ message: error.message, isFetching: false })
    //   );
    //
    // this.setState({ ...this.state, isFetching: false });

    // FETCH DUMMY DATA
    this.setState({ commits: dummyCommits });
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
    const { commits } = this.state;

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
                      <NavLink href="#">Repositories</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="#" active>
                        Commits
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody>
                  <ListGroup flush>
                    {commits.map((commit, key) => (
                      <ListGroupItem key={key}>
                        <CardTitle tag="h4">
                          <CardLink href={commit.html_url}>
                            {commit && commit.commit
                              ? commit.commit.message
                              : null}
                          </CardLink>
                        </CardTitle>
                        <CardSubtitle>
                          <div className="stats">
                            <img
                              className="commit-avatar"
                              src={commit.author.avatar_url}
                              alt="author avatar"
                            />
                            <span className="subtitle-text">
                              {commit.author.login}
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
