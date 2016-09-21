# justtee
`justtee`, a minimal replacement for unix TEE(1)

`justtee` is meant to be a dropin replacement for the most common use case of `TEE(1)`.
It takes one argument, which must be a file path. It will create a file at that path,
overwriting any existing file. It will them copy all standard input (stdin) to both 
standard out (stdout) and the file, and exit when stdin is closed.

We created `justtee` because `tee` has a bug that can manifest as this error:

    tee: standard output: Resource temporarily unavailable
