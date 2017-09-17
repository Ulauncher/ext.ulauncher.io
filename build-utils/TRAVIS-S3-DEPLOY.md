# Set up travis deployment to S3

1. Enter travis container  
   ```
   docker run -it --rm \   
      -v $(pwd):/home/travis/ulauncher \             
      -v $HOME/.bash_history:/root/.bash_history \   
      mgruener/travis-cli
   ```
1. `cd ulauncher`
1. `travis setup s3`
   Follow (https://docs.travis-ci.com/user/deployment/s3/)
   Enter correct Access ID and Secret access key
   Enter `build` when asked for local project dir to upload. Everything else is default.
