import { Router } from 'express';
import { Pessoa } from '../models/Pessoa';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const pessoas = await Pessoa.find().sort({ createdAt: -1 });
    res.json(pessoas);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nome, email, idade } = req.body;
    if (!nome) {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }
    const pessoa = await Pessoa.create({ nome, email, idade });
    res.status(201).json(pessoa);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const pessoa = await Pessoa.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!pessoa) return res.status(404).json({ error: 'Não encontrado' });
    res.json(pessoa);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const pessoa = await Pessoa.findByIdAndDelete(req.params.id);
    if (!pessoa) return res.status(404).json({ error: 'Não encontrado' });
    res.json({ message: 'Removido com sucesso' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
