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
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import dummyCommits from "data/commits.js";

class RegularTables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      commits: [],
    };
  }

  getQueryStringParams = (query) => {
    return query
      ? (/^[?#]/.test(query) ? query.slice(1) : query)
          .split("&")
          .reduce((params, param) => {
            let [key, value] = param.split("=");
            params[key] = value
              ? decodeURIComponent(value.replace(/\+/g, " "))
              : "";
            return params;
          }, {})
      : {};
  };

  fetchRepos() {
    // const org = this.state.org;

    this.setState({ ...this.state, isFetching: true });

    // fetch(`https://api.github.com/orgs/${org}/repos`)
    //   .then((response) => response.json())
    //   .then((repos) => {
    //     if (!repos.message) {
    //       this.setState({
    //         repos: repos,
    //       });
    //     } else {
    this.setState({ commits: dummyCommits });
    //   }
    // })
    // .catch((error) =>
    //   this.setState({ message: error.message, isFetching: false })
    // );

    this.setState({ ...this.state, isFetching: false });
  }

  componentDidMount() {
    // this.getQueryStringParams(this.props.location.search);
    this.fetchRepos();
    this.timer = setInterval(() => this.fetchRepos(), 5000);
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
                    {commits.map((commit, i) => (
                      <ListGroupItem key={i}>
                        <CardTitle tag="h4">
                          <CardLink href={commit.html_url}>
                            {commit.commit.message}
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
