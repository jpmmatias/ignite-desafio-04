import { useEffect } from 'react';
import Header from '../../components/Header';
import api from '../../services/api';
import Food, { FoodTypes } from '../../components/Food';
import ModalAddFood, { AddFood } from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { useState } from 'react';
import { UpdateFood } from '../../components/ModalEditFood/index';

function Dashboard() {
	const [foods, setfoods] = useState<FoodTypes[]>([]);
	const [editingFood, setEditingFood] = useState<UpdateFood>({} as UpdateFood);
	const [modalOpen, setModalOpen] = useState(false);
	const [editModalOpen, setEditingModalOpen] = useState(false);

	useEffect(() => {
		async function getFoods() {
			const response = await api.get('/foods');

			setfoods(response.data);
		}
		getFoods();
	}, []);

	const handleAddFood = async (food: AddFood) => {
		try {
			const response = await api.post('/foods', {
				...food,
				available: true,
			});
			const newFoods = [...foods, response.data];
			setfoods(newFoods);
		} catch (err) {
			console.log(err);
		}
	};

	const handleUpdateFood = async (food: UpdateFood) => {
		try {
			const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
				...editingFood,
				...food,
			});

			const foodsUpdated = foods.map((f) =>
				f.id !== foodUpdated.data.id ? f : foodUpdated.data
			);

			setfoods(foodsUpdated);
		} catch (err) {
			console.log(err);
		}
	};

	const handleDeleteFood = async (id: number) => {
		await api.delete(`/foods/${id}`);

		const foodsFiltered = foods.filter((food) => food.id !== id);

		setfoods(foodsFiltered);
	};

	const toggleModal = () => {
		setModalOpen(!modalOpen);
	};

	const toggleEditModal = () => {
		setEditingModalOpen(!editModalOpen);
	};

	const handleEditFood = (food: FoodTypes) => {
		setEditingModalOpen(true);
		setEditingFood(food);
	};

	return (
		<>
			<Header openModal={toggleModal} />
			<ModalAddFood
				isOpen={modalOpen}
				setIsOpen={toggleModal}
				handleAddFood={handleAddFood}
			/>
			<ModalEditFood
				isOpen={editModalOpen}
				setIsOpen={toggleEditModal}
				editingFood={editingFood}
				handleUpdateFood={handleUpdateFood}
			/>

			<FoodsContainer data-testid='foods-list'>
				{foods &&
					foods.map((food) => (
						<Food
							key={food.id}
							food={food}
							handleDelete={handleDeleteFood}
							handleEditFood={handleEditFood}
						/>
					))}
			</FoodsContainer>
		</>
	);
}

export default Dashboard;
