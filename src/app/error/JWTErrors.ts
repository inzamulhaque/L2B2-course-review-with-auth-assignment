class JWTError extends Error {
  public static success = false;
  public static message = "Unauthorized Access";
  public static errorMessage =
    "You do not have the necessary permissions to access this resource.";
  public static errorDetails = null;
  public static stack = null;

  constructor(message = "Unauthorized Access") {
    super(message);
  }
}

export default JWTError;
