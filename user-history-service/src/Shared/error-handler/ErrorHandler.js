export class ErrorHandler {
  /**
   * @param {import('express').Response} res
   * @param {Error | string} error
   */
  internalError500(res, error) {
    console.error(error);
    res.status(500).json({
      message: error instanceof Error ? error.message : error,
    });
  }

  /**
   * @param {import('express').Response} res
   * @param {Error | string} error
   */
  badRequest400(res, error) {
    console.error(error);
    res.status(400).json({
      message: error instanceof Error ? error.message : error,
    });
  }
}
