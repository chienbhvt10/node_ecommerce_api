const checkPermission = (permission) => {
  return (req, res, next) => {
    if (!req.objkey.permissions) {
      return res.status(403).json({
        message: "Permission denied",
      });
    }

    const validPermissions = req.objkey.permissions.includes(permission);
    if (!validPermissions) {
      return res.status(403).json({
        message: "Permission denied",
      });
    }
    return next();
  };
};

module.exports = { checkPermission };
