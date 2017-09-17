# Set up travis deployment to S3

1. Enter travis container by running `./build-utils/travis-ci-container.sh`
1. `cd ulauncher`
1. `travis setup s3`
   Follow (https://docs.travis-ci.com/user/deployment/s3/)
   Enter correct Access ID and Secret access key
   Enter `build` when asked for local project dir to upload. Everything else is default.
