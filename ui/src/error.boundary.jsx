import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.group("Error");
    console.log(error, info);
    console.groupEnd();
  }

  render() {
    const { ignoreErrors, children } = this.props;
    if (this.state.hasError && !ignoreErrors) {
      return <div>Find error(s) in your browser console</div>;
    }
    return children;
  }
}
