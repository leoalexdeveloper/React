import { Component } from "react";

import "./styles.css";

import { Posts } from "../../components/Posts";
import { loadPosts } from "../../utils/loadPosts";
import { Button } from "../../components/Buttton";
import { TextInput } from "../../components/TextInput";

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    noMorePosts: false,
  };

  handleTimeout() {}

  async componentDidMount() {
    await this.loadPosts();
  }

  componentDidUpdate(){
    console.log(this.props);
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postAndPhotos = await loadPosts();
    this.setState({
      posts: postAndPhotos.slice(page, postsPerPage),
      allPosts: postAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;

    const nextPage = page + postsPerPage;

    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;

    const filteredPosts = !!searchValue
      ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue);
        })
      : posts;

    const noMorePosts = page + postsPerPage > filteredPosts.length;

    return (
      <section className="container ">
        <div clasName="search-container">
          {!!searchValue && <h1>Search value: {searchValue}</h1>}
        <TextInput handleChange={this.handleChange} searchValue={searchValue} />
        </div>

        {filteredPosts.length > 0 ? (
          <Posts posts={filteredPosts} />
        ) : (
          <h1>
            Não existem posts com o termo: <em>"{searchValue}"</em>
          </h1>
        )}
        <div className="button-container">
          <Button quandoclica={this.loadMorePosts} disabled={noMorePosts} />
        </div>
      </section>
    );
  }
}
