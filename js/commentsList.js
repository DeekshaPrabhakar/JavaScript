class Comment extends React.Component {
    constructor() {
      super();
        this.state = {
            isAbusive: false
        };
    }

    render() {
        let commentBody;
        if (!this.state.isAbusive) {
            commentBody = this.props.body;
        } else {
            commentBody = <em>Content marked as abusive</em>;
        }
        return(
          <div className="comment">
            <img src={this.props.avatarUrl} alt={`${this.props.author}'s picture`} />
            <p className="comment-header">{this.props.author}</p>
            <p className="comment-body">
              {commentBody}
            </p>
            <div className="comment-actions">
              <a href="#">Delete comment</a>
              <a href="#" onClick={this._toggleAbuse.bind(this)}>Report as Abuse</a>
            </div>
          </div>
      );
    }

    _toggleAbuse(event) {
        event.preventDefault();

        this.setState({
            isAbusive: !this.state.isAbusive
        });
    }
}

class CommentBox extends React.Component {
    constructor() {
      super();

        this.state = {
            showComments: false,
            comments: [
              { id: 1, author: 'Morgan McCircuit', body: 'Great picture!', avatarUrl: 'images/default-avatar.png' },
              { id: 2, author: 'Bending Bender', body: 'Excellent stuff', avatarUrl: 'images/default-avatar.png' }
            ]
        };
    }

    render() {
        const comments = this._getComments();
        return(
          <div className="comment-box">
            <CommentForm addComment={this._addComment.bind(this)} />
            <h3>Comments</h3>
        {this._getPopularMessage(comments.length)}
        <h4 className="comment-count">{this._getCommentsTitle(comments.length)}</h4>
        <div className="comment-list">
          {comments}
        </div>
      </div>
      );
    }

    _getPopularMessage(commentCount) {
        const POPULAR_COUNT = 10;
        if (commentCount > POPULAR_COUNT) {
            return (
              <div>This post is getting really popular, don't miss out!</div>
           );
        }
    }
  
    _getComments() {
        return this.state.comments.map((comment) => {
            return (<Comment
                     author={comment.author}
                   body={comment.body}
    avatarUrl={comment.avatarUrl}
    key={comment.id} />);
});
}

_getCommentsTitle(commentCount) {
    if (commentCount === 0) {
        return 'No comments yet';
    } else if (commentCount === 1) {
        return '1 comment';
    } else {
        return `${commentCount} comments`;
    }
}
  
_addComment(commentAuthor, commentBody) {
    let comment = {
        id: Math.floor(Math.random() * (9999 - this.state.comments.length + 1)) + this.state.comments.length,
        author: commentAuthor,
        body: commentBody
    };
    
    this.setState({
        comments: this.state.comments.concat([comment])
    });
}
}

class CommentForm extends React.Component {
    constructor() {
      super();
        this.state = {
            characters: 0
        };
    }
  
    render() {
        return (
          <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
            <label>New comment</label>
            <div className="comment-form-fields">
              <input placeholder="Name:" ref={c => this._author = c} />
              <textarea placeholder="Comment:" ref={c => this._body = c} onChange={this._getCharacterCount.bind(this)}></textarea>
            </div>
            <p>{this.state.characters} characters</p>
            <div className="comment-form-actions">
              <button type="submit">
                Post comment
              </button>
            </div>
          </form>
    );
}
  
_getCharacterCount(e) {
    this.setState({
        characters: this._body.value.length
    });
}
  
_handleSubmit(event) {
    event.preventDefault();
    
    if(!this._author.value || !this._body.value){
        alert("Please enter your name and comment");
        return;
    }

    this.props.addComment(this._author.value, this._body.value);
    
    this._author.value = '';
    this._body.value = '';
    
    this.setState({ characters: 0  });
}
}