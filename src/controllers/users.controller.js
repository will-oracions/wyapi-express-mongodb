export const findById = async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
  
      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
};

export const findAll = async (req, res) => {
    try {
      const users = await Users.find().select("-password");
      res.json(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
};

export const updateUser = async (req, res) => {
    try {
      const { name, avatar } = req.body;
      await Users.findByIdAndUpdate(
        { _id: req.user.id },
        { name, avatar },
      );
      res.json({ msg: "modifier avec succès" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
};

export const findAdmins = async (req, res) => {
    try {
      const users = await Users.find({role :{ $eq: 1 }})
      
      res.json(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
};