import { Paper, Typography } from "@material-ui/core";
import React from "react";
import { useFeedSideSuggestionsStyles } from "../../styles";
import { getDefaultUser } from '../../data';
import FollowButton from '../shared/FollowButton';
import UserCard from "../shared/UserCard";

function FeedSideSuggestions() {
  const classes = useFeedSideSuggestionsStyles();

  return (
    <article className={classes.article}>
      <Paper>
        <Typography
          color="textSecondary"
          variant="subtitle2"
          component="h2"
          align="left"
          gutterBottom
          className={classes.typography}
        >
          Suggestions
        </Typography>
        {Array.from({ length: 5 }, () => getDefaultUser()).map(user => (
          <div key={user.id} className={classes.card}>
            <UserCard user={user} />
            <FollowButton side={true} />

          </div>
        ))
        }
      </Paper>

    </article>
  )
}

export default FeedSideSuggestions;
