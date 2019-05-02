import React, { Component } from "react";
import Loading from "./Loading";
import Listings from "./Listings";
export default class App extends Component {
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
            date. The file that will download will be a .csv file. This should
            be able to be opened by excel with no problems. Please let me know
            how I can make this better and easier for you to use.
          </p>
        </div>
        <div className="flex-wrapper">
          <Listings>
            {({ loading, listings, createCSV }) => {
              if (loading) return <Loading />;
              return Object.keys(listings).map(date => {
                const results = listings[date];

                return (
                  <div key={date} className="listings row align-items-center">
                    <div className="col-xs">
                      Foreclosures Generated on {date}:{" "}
                      <a
                        className="btn btn-dark"
                        download
                        href={createCSV(results)}
                      >
                        Download
                      </a>
                    </div>
                  </div>
                );
              });
            }}
          </Listings>
        </div>
      </div>
    );
  }
}
