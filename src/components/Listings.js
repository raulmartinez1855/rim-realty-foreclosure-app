import React, { Component } from "react";

export default class Listings extends Component {
  state = {
    listings: {},
    loading: true
  };

  componentDidMount() {
    this.fetchResults();
  }

  fetchResults = async () => {
    try {
      const res = await fetch(
        "https://expppress.herokuapp.com/api?pageSize=1000"
      );
      const resJson = await res.json();
      const listings = resJson.data.reduce((acc, cv) => {
        const date = cv.dateCreated;
        acc[date] ? acc[date].push(cv) : (acc[date] = [cv]);
        return acc;
      }, {});
      this.setState(
        { listings, loading: false },
        () => (window.listings = this.state.listings)
      );
    } catch (err) {
      console.log(err);
    }
  };

  createCSV = arr => {
    console.log(this.state.listings);
    const csvArr = arr.reduce((acc, cur) => {
      const { dateCreated, caseNumber, address, name, notice } = cur;
      return [...acc, [dateCreated, caseNumber, notice, name, address]];
    }, []);
    const csvContent =
      "data:text/csv;charset=utf-8," + csvArr.map(e => e.join(",")).join("\n");
    return encodeURI(csvContent);
  };
  render() {
    const { children } = this.props;
    return children({
      ...this.state,
      createCSV: this.createCSV
    });
  }
}
