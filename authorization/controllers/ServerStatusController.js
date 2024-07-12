module.exports = {
    check: (req, res) => {
        return res.status(200).json({
            status: true,
          });
    }

}