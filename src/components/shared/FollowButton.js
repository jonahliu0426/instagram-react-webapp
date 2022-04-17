import { useMutation } from "@apollo/client";
import { Button } from "@material-ui/core";
import React from "react";
import { UserContext } from "../../App";
import { FOLLOW_USER } from "../../graphql/mutations";
import { useFollowButtonStyles } from "../../styles";


function FollowButton({ id, side }) {
  const { me, currentUserId } = React.useContext(UserContext)
  const classes = useFollowButtonStyles({ side });
  const [isFollowing, setFolloing] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const [followUser] = useMutation(FOLLOW_USER);

  function handleFollowUser() {
    setFolloing(true);
    const variables = {
      userIdToFollow: id,
      currentUserId
    }
    followUser({ variables });
  }

  const FollowButton = (
    <Button
      variant={side ? "text" : "contained"}
      color="primary"
      className={classes.button}
      onClick={handleFollowUser}
      fullWidth
    >
      Follow
    </Button>
  )

  const FollowingButton = (
    <Button
      variant={side ? "text" : "outlined"}
      className={classes.followingButton}
      onClick={() => setFolloing(false)}
      fullWidth
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}

    >
      {hover ? "Unfollow" : "Following"}
    </Button>
  )

  return isFollowing ? FollowingButton : FollowButton;
}

export default FollowButton;
