import React, { Component } from "react";

export default class App extends Component {
  state = {
    listings: {}
  };

  componentDidMount() {
    this.fetchResults();
  }

  fetchResults = async () => {
    const res = await fetch("https://expppress.herokuapp.com/api?pageSize=200");
    const resJson = await res.json();
    const listings = resJson.data.reduce((acc, cv) => {
      const date = cv.dateCreated;
      acc[date] ? acc[date].push(cv) : (acc[date] = [cv]);
      return acc;
    }, {});
    this.setState({ listings }, () => (window.listings = this.state.listings));
  };

  createCSV = arr => {
    const csvArr = arr.reduce((acc, cur) => {
      const { defendant, address, city, state, zip } = cur;
      return [...acc, [defendant, address, city, state, zip]];
    }, []);
    const csvContent =
      "data:text/csv;charset=utf-8," + csvArr.map(e => e.join(",")).join("\n");
    return encodeURI(csvContent);
  };

  render() {
    return (
      <div className="App">
        <div className="jumbotron">
          <h1 className="display-4">Hello, Idania!</h1>
          <p className="lead">
            This is a simple application that will scrape law.com for new
            foreclosures every day.
          </p>
          <hr className="my-4" />
          <p>
            The new unique listings will be available for download below by
            date. Currently, there is only one report because I have only ran it
            one time. The file that will download will be a .csv file. This
            should be able to be opened by excel with no problems. Please let me
            know how I can make this better and easier for you to use.
          </p>
        </div>
        <div className="flex-wrapper">
          {Object.keys(this.state.listings).map(date => {
            const results = this.state.listings[date];

            return (
              <div key={date} className="row align-items-center">
                <div className="col-xs">
                  Foreclosures Generated on {date}:{" "}
                  <a
                    className="btn btn-dark"
                    download
                    href={this.createCSV(results)}
                  >
                    Download
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
