import { gql, useApolloClient, useMutation } from '@apollo/client';
import { Grid } from '@mui/material';
import React from 'react'
import { connect } from 'react-redux';
import useForm from '../utils/useForm';

const EDIT_PROFILE_MUTATION = gql `
    mutation editProfile($input: EditProfileInput!) {
        editProfile(input: $input) {
            ok
            error
        }
    }
`;


const EditProfile = ({ user }) => {
    const client = useApolloClient()
    const onCompleted = (data) => {
        const { editProfile: { ok } } = data
        if(ok && user) {
            const { phone: prevPhone, id } = user;
            const { phone: newPhone } = handleChange();
            if(prevPhone !== newPhone) {
                client.writeFragment({
                    id: `User:${id}`,
                    fragment: gql `
                        fragment EditedUser on User {
                            verified
                            phone
                        }
                    `,
                    data: {
                        phone: newPhone,
                        verified: true
                    }
                })
            }
        }
    }
    const [editProfile, { loading }] = useMutation(EDIT_PROFILE_MUTATION, {
        onCompleted
    })
    const { value, handleChange, handleSubmit, clearValueForm } = useForm({
        mode: 'onChange',
        defaultValues: {
            phone: user.phone
        }
    });


    const onSubmit = () => {
        const { phone, code } = handleChange()
        editProfile({
            variables: {
                input: {
                    phone,
                    ...(code !== "" && { code })
                }
            }
        })
    }
    
    return (
        <Grid>

        </Grid>
    )
}


const mapStateToProps = (state) => ({
    user: state.app.user,
  });

export default connect(mapStateToProps, null)(EditProfile);