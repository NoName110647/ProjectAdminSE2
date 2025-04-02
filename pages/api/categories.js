import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req, res) {
  const { method } = req;
  console.log('POST Request Body:', req.body);

  await mongooseConnect();

  if (method === 'GET') {
    const categories = await Category.find().populate('parent');
    res.json(categories);
  }

  if (method === 'POST') {
    const { name, parentCategory, properties } = req.body;
  
    // ตรวจสอบข้อมูลที่รับมาจาก body
    console.log('POST Request Body:', req.body);
  
    const categoryDoc = await Category.create({
      name,
      parent: parentCategory === '0' || parentCategory === null ? null : parentCategory,
      properties, // ส่ง properties ที่รับมาด้วย
    });
  
    console.log('Category Created:', categoryDoc); // ดูว่า category ถูกสร้างหรือไม่
    res.json(categoryDoc);
  }
  

  if (method === 'PUT') {
    const { name, parentCategory, _id } = req.body;
    const categoryDoc = await Category.findByIdAndUpdate(
        _id, 
        { name, parent: parentCategory === '0' ? null : parentCategory }, 
        { new: true } // รีเทิร์นค่าใหม่หลังจากอัปเดต
    ).populate('parent');
    res.json(categoryDoc);
}
if (method === 'DELETE'){
    const {_id} = req.query;
    await Category.deleteOne({_id});
    res.json('ok');
}

}
