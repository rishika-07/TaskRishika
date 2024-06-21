import React, { useState } from 'react';
import { Paper, Typography, TextField, Select, MenuItem, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Octokit } from '@octokit/rest';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

const GithubRepoCreator = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public'); // Ensure proper type definition here
  const [message, setMessage] = useState<string>('');

  // Replace 'your_github_token_here' with your actual GitHub personal access token
  const GITHUB_TOKEN = 'your_github_token_here';

  const octokit = new Octokit({ auth: GITHUB_TOKEN });

  const handleSubmit = async () => {
    try {
      const response = await octokit.repos.createForAuthenticatedUser({
        name,
        description,
        private: visibility === 'private',
      });

      setMessage(`Repository created successfully: ${response.data.html_url}`);

      // Clear the form after successful submission
      setName('');
      setDescription('');
      setVisibility('public');
    } catch (error: any) {
      setMessage(`Error creating repository: ${error.message}`);
    }
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h4" align="center">Create GitHub Repository</Typography>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          label="Repository Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />
        <Select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value as 'public' | 'private')}
          fullWidth
        >
          <MenuItem value="public">Public</MenuItem>
          <MenuItem value="private">Private</MenuItem>
        </Select>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Create Repository
        </Button>
      </form>
      {message && <Typography variant="body1">{message}</Typography>}
    </Paper>
  );
};

export default GithubRepoCreator;
