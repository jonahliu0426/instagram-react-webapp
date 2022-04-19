import { Button, Divider, Hidden, TextField, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useFeedPostStyles } from "../../styles";
import UserCard from "../shared/UserCard";
import { MoreIcon, CommentIcon, ShareIcon, UnlikeIcon, LikeIcon, SaveIcon, RemoveIcon } from "../../icons";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import FollowSuggestions from "../shared/FollowSuggestions";
import OptionDialog from "../shared/OptionsDialog";
import { formatDateToNow } from "../../utils/formatDate";
import Img from 'react-graceful-image';


function FeedPost({ post, index }) {
  const classes = useFeedPostStyles();
  const [showCaption, setShowCaption] = React.useState(false);
  const { id, media, likes, user, caption, created_at, comments, likes_aggregate, saved_posts, location, comments_aggregate } = post;
  const showFollowingSuggestions = index === 1;
  const [showOptionDialog, setShowOptionDialog] = React.useState(false);
  const likesCount = likes_aggregate.aggregate.count;
  const commentsCount = comments_aggregate.aggregate.count;

  return (
    <>
      <article className={classes.article}>
        {/* Feed Post Header */}
        <div className={classes.postHeader}>
          <UserCard user={user} location={location} />
          <MoreIcon
            className={classes.MoreIcon}
            onClick={() => setShowOptionDialog(true)}
          />
        </div>
        {/* Feed Post Image */}
        <div>
          <Img src={media} alt="Post media" className={classes.image} />
        </div>
        {/* Feed Post Button */}
        <div className={classes.postButtonsWrapper}>
          <div className={classes.postButtons}>
            <LikeButton />
            <Link to={`/p/${id}`}>
              <CommentIcon />
            </Link>
            <ShareIcon />
            <SaveButton />
          </div>
          {/* Post Likes Count */}
          <Typography className={classes.likes} variant="subtitle2">
            <span>{likesCount === 1 ? "1 like" : `${likesCount} likes`}</span>
          </Typography>
          {/* Post Caption with Expand and Collapse option */}
          <div className={showCaption ? classes.expanded : classes.collapsed}>
            <Link to={`/${user.username}`}>
              <Typography variant="subtitle2" component="span" className={classes.username}>
                {user.username}
              </Typography>
            </Link>
            {showCaption ? (
              <>
                <Typography
                  variant="body2"
                  component="span"
                  dangerouslySetInnerHTML={{ __html: caption }}
                />
                <Button
                  className={classes.moreButton}
                  onClick={() => setShowCaption(false)}
                >
                  less
                </Button>
              </>
            ) : (
              <div className={classes.captionWrapper}>
                <HTMLEllipsis
                  unsafeHTML={caption}
                  className={classes.caption}
                  maxLine="0"
                  ellipsis="..."
                  basedOn="letters"
                />
                <Button
                  className={classes.moreButton}
                  onClick={() => setShowCaption(true)}
                >
                  more
                </Button>
              </div>
            )}
          </div>
          {/* Post Comment Area */}
          <Link to={`/p/${id}`}>
            <Typography
              className={classes.comentsLink}
              variant="body2"
              component="div"
            >
              View all {commentsCount} comments
            </Typography>
          </Link>
          {comments.map(comment => (
            <div key={comment.id}>
              <Link to={`/${comment.user.username}`}>
                <Typography>
                  {comment.user.name}
                </Typography>
                <Typography>
                  {comment.content}
                </Typography>
              </Link>
            </div>
          ))}
          <Typography color="textSecondary" className={classes.datePosted}>
            {formatDateToNow(created_at)}
          </Typography>
        </div>
        <Hidden xsDown>
          <Divider />
          <Comment />
        </Hidden>
      </article>
      {showFollowingSuggestions && <FollowSuggestions />}
      {showOptionDialog && <OptionDialog authorId={user.id} postId={id} onClose={() => setShowOptionDialog(false)} />}
    </>
  )
}

const LikeButton = () => {
  const classes = useFeedPostStyles();
  const [liked, setLiked] = React.useState(false);
  const Icon = liked ? UnlikeIcon : LikeIcon;
  const className = liked ? classes.liked : classes.like;

  const handleLike = () => {
    setLiked(true)
  }

  const handleUnlike = () => {
    setLiked(false);
  }

  const onClick = liked ? handleUnlike : handleLike;

  return <Icon className={className} onClick={onClick} />
}

const SaveButton = () => {
  const classes = useFeedPostStyles();
  const [saved, setSaved] = React.useState(false);
  const Icon = saved ? RemoveIcon : SaveIcon;

  const handleSave = () => {
    setSaved(true)
  }

  const handleRemove = () => {
    setSaved(false);
  }

  const onClick = saved ? handleRemove : handleSave;

  return <Icon className={classes.saveIcon} onClick={onClick} />
}

const Comment = () => {
  const classes = useFeedPostStyles();
  const [content, setContent] = React.useState('');

  return (
    <div className={classes.commentContainer}>
      <TextField
        fullWidth
        value={content}
        placeholder="Add a comment"
        multiline
        rowsMax={2}
        rows={1}
        className={classes.textField}
        onChange={event => setContent(event.target.value)}
        InputProps={{
          classes: {
            root: classes.root,
            underline: classes.underline
          }
        }}
      />
      <Button
        color="primary"
        className={classes.commentButton}
        disabled={!content.trim()}
      >
        Post
      </Button>
    </div>)
}

export default FeedPost;
