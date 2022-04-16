import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation createUsers($userId: String!, $name: String!, $username: String!, $email: String!, $bio: String!, $website: String!, $profileImage: String!, $phoneNumber: String!) {
  insert_users(objects: {user_id: $userId, name: $name, username: $username, email: $email, bio: $bio, website: $website, profile_image: $profileImage, phone_number: $phoneNumber}) {
    affected_rows
  }
}
`

export const EDIT_USER = gql`
mutation editUser($id: uuid!, $name: String!, $username:String!, $website: String!, $bio: String!, $phoneNumber: String!, $email: String!) {
  update_users(where: {id: {_eq: $id}}, _set: {name: $name, username: $username, website: $website, bio: $bio, email: $email, phone_number: $phoneNumber}) {
    affected_rows
  }
}
`

export const EDIT_USER_AVATAR = gql`
mutation editProfilePic($id: uuid!, $profileLink: String!) {
  update_users(where: {id: {_eq: $id}}, _set: {profile_image: $profileLink}) {
    affected_rows
  }
}
`

export const CREATE_POST = gql`
mutation createPost($userId: uuid!, $media: String!, $location: String!, $caption: String!) {
  insert_posts(objects: {caption: $caption, location: $location, media: $media, user_id: $userId}) {
    affected_rows
  }
}`

export const LIKE_POST = gql`
mutation likePost($postId: uuid!, $userId: uuid!, $profileId: uuid!) {
  insert_likes(objects: {post_id: $postId, user_id: $userId}) {
    affected_rows
  }
  insert_notifications(objects: {post_id: $postId, profile_id: $profileId, type: "like", user_id: $userId}){
    affected_rows
  }
}
`

export const UNLIKE_POST = gql`
mutation unlikePost($postId: uuid!, $userId: uuid!, $profileId: uuid!) {
  delete_likes(where: {post_id: {_eq: $postId}, user_id: {_eq: $userId}}) {
    affected_rows
  }
  delete_notifications(where: {profile_id: {_eq: $profileId}, user_id: {_eq: $userId}, type: {_eq: "like"}, post_id: {_eq: $postId}}) {
    affected_rows
  }
}
`

export const SAVE_POST = gql`
mutation savePost($postId: uuid!, $userId: uuid!) {
  insert_saved_posts(objects: {post_id: $postId, user_id: $userId}) {
    affected_rows
  }
}
`

export const UNSAVE_POST = gql`
mutation unsavePost($postId: uuid!, $userId: uuid!) {
  delete_saved_posts(where: {post_id: {_eq: $postId}, user_id: {_eq: $userId}}) {
    affected_rows
  }
}
`

export const CREATE_COMMENT = gql`
mutation createComment($postId: uuid!, $userId: uuid!, $content: String!) {
  insert_comments(objects: {post_id: $postId, user_id: $userId, content: $content}) {
    affected_rows
  }
}
`

export const CHECK_NOTIFICATIONS = gql`
  mutation checkNotifications($userId: uuid!, $lastChecked: String!) {
  update_users(where: {id: {_eq: $userId}}, _set: {last_checked: $lastChecked}) {
    affected_rows
  }
}
`