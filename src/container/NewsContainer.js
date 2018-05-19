import propTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchNews } from "../ducks/news";
import PreLoader from "../components/PreLoader/PreLoader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Articles from "../components/Articles/Articles";

class News extends Component {
  componentDidMount() {
    this.props.dispatch(fetchNews);
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.news.items.length === 0 ||
      this.props.news.items !== nextProps.news.items
    );
  }

  render() {
    const { loading, error, items } = this.props.news;
    return loading ? (
      <PreLoader />
    ) : error ? (
      <ErrorMessage error={error} />
    ) : (
      <Articles news={items} />
    );
  }
}

News.propTypes = {
  news: propTypes.shape({
    items: propTypes.array.isRequired,
    loading: propTypes.bool.isRequired,
    error: propTypes.object
  }).isRequired
};

const mapStateToProps = state => ({
  news: state.rootReducer.news
});

export default connect(mapStateToProps)(News);
