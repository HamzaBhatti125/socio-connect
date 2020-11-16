import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
          <footer className="backGround bg-dark text-white mt-5 p-4 text-center">
            Copyright &copy; {new Date().getFullYear()} SocioConnect
          </footer>
        );
    }
}
