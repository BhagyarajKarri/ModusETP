


const csvUtils = require('../utilities/csvUtils');

const itemsController = {
    getAllItems: async (req, res) => {
      try {
        const data = await csvUtils.readCSVData();
        res.json(data);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    },
  
    createItem: async (req, res) => {
      try {
        const newRecord = req.body;
        const existingData = await csvUtils.readCSVData();
  
        /* const highestSNo = Math.max(...existingData.map(item => item['s.no']));
        console.log(highestSNo);
        newRecord['s.no'] = highestSNo + 1; */
  
        existingData.push(newRecord);
        csvUtils.writeCSVData(existingData);
  
        res.status(201).json(newRecord);
      } catch (error) {
       // console.error(error); 
        res.status(500).json({ error: 'Internal server error' });
      }
    },

    getItemBySno: async (req, res) => {
      try {
        const snoToFind = req.params.sno; // Get the 'sno' from the request parameters
        const data = await csvUtils.readCSVData();
        const item = data.find((item) => item['s.no'] === snoToFind);
  
        if (item) {
          res.json(item);
        } else {
          res.status(404).json({ error: 'Item not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    },
  
    updateItem: async (req, res) => {
      try {
        const snoToUpdate = req.params.sno;
        const updatedData = req.body;
  
        const data = await csvUtils.readCSVData();
        const updatedDataIndex = data.findIndex(item => item['s.no'] === snoToUpdate);
  
        if (updatedDataIndex !== -1) {
          data[updatedDataIndex] = updatedData;
          csvUtils.writeCSVData(data);
  
          res.json(updatedData);
        } else {
          //console.log(error);
          res.status(404).json({ error: 'Item not found' });
        }
      } catch (error) {
        //console.log(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },
  
    deleteItem: async (req, res) => {
      try {
        const snoToDelete = req.params.sno;
  
        const data = await csvUtils.readCSVData();
        const newData = data.filter(item => item['s.no'] !== snoToDelete);
  
        if (newData.length < data.length) {
          csvUtils.writeCSVData(newData);
          res.json({ message: 'Item deleted successfully' });
        } else {
         // console.log(error);
          res.status(404).json({ error: 'Item not found' });
        }
      } catch (error) {
       // console.log(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };
  
  module.exports = itemsController;
