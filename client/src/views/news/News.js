import React, { Component } from "react";

import axios from "axios";
import RssParser from 'rss-parser';
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";

import PageTitle from './../../components/common/PageTitle';

import './Styles.css'
import * as rssParser from 'react-native-rss-parser';

const googleNewsUrl = 'https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx6TVdZU0FtVnVHZ0pWVXlnQVAB/sections/CAQiXENCQVNQd29JTDIwdk1EbHpNV1lTQW1WdUdnSlZVeUlQQ0FRYUN3b0pMMjB2TURsNU5IQnRLaG9LR0FvVVRVRlNTMFZVVTE5VFJVTlVTVTlPWDA1QlRVVWdBU2dBKioIAComCAoiIENCQVNFZ29JTDIwdk1EbHpNV1lTQW1WdUdnSlZVeWdBUAFQAQ?hl=en-US&gl=US&ceid=US%3Aen';
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const LIMIT = 10;

class News extends React.Component {
  constructor(props: {}) {
         super(props);
         this.state = { feed: null, limit: LIMIT, newsItems: [] };
         this.onLoadMore = this.onLoadMore.bind(this);
    }

    onLoadMore() {
        const newLimit = this.state.limit + LIMIT;
        const newsItems = this.state.feed.items.slice(0,newLimit);
        this.setState({
            limit: newLimit,
            newsItems: newsItems
        });
    }

    async componentDidMount() {
        const response = await fetch('/getNews');
        const feed = await response.json();

        this.setState({ feed: feed });

        if( feed ) {
          const newsItems = feed.items.slice(0,this.state.limit);
          this.setState({ newsItems: newsItems });
        }
    }

    render() {
       return (
      <Container fluid className="main-content-container px-4 py-4">


        <Row>
          <Col>
            <Card className="mb-4 news-card">
              <CardHeader className="border-bottom p-3">
                <h6 className="m-0">Google News</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <div className="tab-content px-3 pt-3 pb-1">
                  {
                    this.state.feed && this.state.feed.items.slice(0,this.state.limit).map((item) => (
                      <div className="tab-pane px-2 py-0 d-block">
                        <div className="media p-1">
                          <div className="media-body w-100">
                            <div className="news-title">
                              <h6 className="title-small mb-0">
                                <a className="text-fiord-blue" href={item.link} target="_blank" rel="noreferrer">{item.title}</a>
                              </h6>
                            </div>
                            <div className="news-auther small">
                              <span style={{marginRight: '20px'}} className="time d-inline-block">{item.pubDateFromNow}</span>
                              <span className="time d-inline-block">{item.source}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className="tab-content px-3 py-0">
                {
                  this.state.newsItems.length > 0 && <button className="btn btn-link py-0 medium font-weight-bold" onClick={this.onLoadMore}> Load More>> </button>
                }
                </div>
                {/*
                <ul class="list-group list-group-dividered list-group-full">
                    {
                      this.state.feed && this.state.feed.items.map((item) => (
                              <li class="list-group-item">
                                <div class="media">
                                  <div class="media-body">
                                    <h6 class="media-heading font-weight-strong">{item.title}</h6>
                                    <div>
                                      <a href={item.link}>link</a>
                                    </div>
                                  </div>
                                </div>
                              </li>
                    ))}
                </ul>
                */}
              </CardBody>
            </Card>
          </Col>
        </Row>

       </Container>
       );
   }
}

export default News;
