import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  renderLinks() {
	  if (this.props.authenticated) {
		  return(
			  <div>
				  <nav className="navbar navbar-light">
					  <ul className="nav navbar-nav">
              <li className="nav-item">
  							<Link to="/signout">Sign Out</Link>
							</li>
              <li className="nav-item">
							  <Link to="/feature">Feature</Link>
							</li>
						</ul>
  				</nav>
				</div>
			);
		} else {
		  return(
			  <div>
				  <nav className="navbar navbar-light">
					  <ul className="nav navbar-nav">
              <li className="nav-item">
                <Link to="/signup">Sign Up</Link>
							</li>
              <li className="nav-item">
                <Link to="/signin">Sign In</Link>
							</li>
						</ul>
  				</nav>
				</div>

			);
		}
	}

  render() {
    return(
      <div>
        <Link to="/">Redux Auth</Link>
				{this.renderLinks()}
      </div>
    )
  };
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
