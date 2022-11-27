import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
mutation LoginMutation($email: String!, $password: String!) {
  login(user: { email: $email, password: $password }) {
    accessToken
    expiresIn
  }
}
`;
