import { Button, Divider, Hidden, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useFeedPostStyles } from "../../styles";
import UserCard from "../shared/UserCard";
import { MoreIcon, CommentIcon, ShareIcon } from "../../icons";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import { CommentSharp } from "@material-ui/icons";

function FeedPost({ post }) {
  const classes = useFeedPostStyles();
  const [showCaption, setShowCaption] = React.useState(false);
  const { id, media, likes, user, caption, comments } = post;

  return (
    <>
      <article className={classes.article}>
        {/* Feed Post Header */}
        <div className={classes.postHeader}>
          <UserCard />
          <MoreIcon
            className={classes.MoreIcon}
          />
        </div>
        {/* Feed Post Image */}
        <div>
          <img src={media} alt="Post media" className={classes.image} />
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
          <Typography className={classes.like} variant="subtitle2">
            <span>{likes === 1 ? "1 like" : `${likes} likes`}</span>
          </Typography>
          {/* Post Caption with Expand and Collapse option */}
          <div className={showCaption ? classes.expanded : classes.collapsed}>
            <Link to={`/${user.username}`}>
              <Typography variant="subtitle2" component="span" className={classes.username}>
                {user.username}
              </Typography>
            </Link>
            {showCaption ? (
              <Typography
                variant="body2"
                component="span"
                dangerouslySetInnerHTML={{ __html: caption }}
              />) : (
              <div>
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
              View all {comments.length} comments
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
            5 DAYS AGO
          </Typography>
        </div>
        <Hidden xsDown>
          <Divider />
          <Comment />
        </Hidden>
      </article>
    </>
  )
}

const LikeButton = () => {
  return <>Like Button</>
}

const SaveButton = () => {
  return <>Save Button</>
}

const Comment = () => {
  return <>Comment</>
}

export default FeedPost;
